defmodule DotcomWeb.BlogController do
  use DotcomWeb, :controller

  def index(conn, _params) do
    posts = Dotcom.Blog.all_posts()
    render(conn, "index.html", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    post = Dotcom.Blog.get_post_by_id!(id)
    render(conn, "show.html", post: post)
  end
end
