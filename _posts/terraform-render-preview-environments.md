---
title: 'PR-Based Preview Environments on Render with Terraform'
excerpt: 'Render preview environments require Blueprints, but a GitHub issue suggested a Terraform + GitHub Actions workaround. I built a reusable module for it.'
date: '2026-03-10T12:00:00.0Z'
coverImage: '/assets/blog/terraform-render-preview/cover.png'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/terraform-render-preview/cover.png'
---

### The problem

If you use [Render](https://render.com) and manage infrastructure with Terraform, you've probably noticed that preview environments are locked behind [Blueprints](https://docs.render.com/blueprints). There's no way to create them through the [Terraform provider](https://github.com/render-oss/terraform-provider-render) alone.

This came up in [an issue](https://github.com/render-oss/terraform-provider-render/issues/18) on the `terraform-provider-render` repo. A Render contributor [suggested](https://github.com/render-oss/terraform-provider-render/issues/18#issuecomment-2289108310) a workaround: use a combination of Terraform and GitHub Actions to create and destroy resources based on PR lifecycle events, toggling plans and environment variables depending on whether the branch is `main` or not.

I tried it. It worked. So I packaged it into a reusable Terraform module: [`terraform-render-preview-module`](https://github.com/dviramontes/terraform-render-preview-module).

### The core idea

The pattern is straightforward:

1. When a PR is opened or updated, run `terraform apply` with `is_preview=true` and `pr_number=<N>` — this creates a preview instance with a suffixed name like `my-app-pr-123`.
2. When the PR is closed, run `terraform destroy` to tear it down.
3. When code is pushed to `main`, run `terraform apply` with `is_preview=false` to update the production environment.

Each preview gets its own Terraform state file (keyed by PR number), so multiple previews can coexist without stepping on each other.

```markdown
PR opened => terraform apply (state: pr-123.tfstate) => preview up
PR updated => terraform apply (state: pr-123.tfstate) => preview updated
PR closed => terraform destroy (state: pr-123.tfstate) => preview gone
push main => terraform apply (state: prod.tfstate) => prod updated
```

### The module

The module lives at `modules/render-preview-stack` and accepts inputs for toggling between production and preview:

```hcl
module "render_preview_stack" {
  source = "git::https://github.com/dviramontes/terraform-render-preview-module.git//modules/render-preview-stack?ref=v0.1.0"

  is_preview       = var.is_preview
  pr_number        = var.pr_number
  name_prefix      = "my-app"
  region           = "oregon"
  web_plan_prod    = "starter"
  web_plan_preview = "starter"
  start_command    = "npm start"

  runtime_source = {
    native_runtime = {
      auto_deploy   = true
      branch        = "main"
      build_command = "npm install"
      repo_url      = "https://github.com/your-org/your-repo"
      runtime       = "node"
    }
  }

  env_vars = {
    APP_ENV = {
      value_prod    = "production"
      value_preview = "preview"
    }
  }
}
```

The `is_preview` flag controls naming, plan selection, and environment variable values. The `pr_number` variable gets appended to resource names so each PR gets isolated infrastructure.

### GitHub Actions glue

The repo includes a workflow that wires everything together. On `pull_request` events (opened, synchronize, reopened), it runs `terraform apply` with the preview variables. On PR close, it runs `terraform destroy`. On push to `main`, it applies the production configuration.

State is stored in S3 with a per-PR key for previews and a separate key for production. The workflow supports both OIDC and static AWS credentials for authentication.

### Why not just use Blueprints?

Blueprints work fine if your entire stack is defined in a `render.yaml`. But if you're already using Terraform to manage your Render infrastructure — maybe alongside other providers — maintaining a parallel Blueprint definition just for previews can be hard to keep in sync. This approach keeps everything in Terraform and lets you use the same IaC workflow for both production and preview environments.

### A complete example

For a real-world example, check out [this PR](https://github.com/dviramontes/loteria/pull/1).

### Wrapping up

This started as a quick experiment based on a suggestion in a GitHub issue. The workaround turned out to be clean enough to generalize into a module. If you're using Terraform with Render and want PR-based preview environments without Blueprints, give [`terraform-render-preview-module`](https://github.com/dviramontes/terraform-render-preview-module) a try.
