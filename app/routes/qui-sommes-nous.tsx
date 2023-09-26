import { redirect } from "@remix-run/node";

export const loader = () => redirect("/about-us", 301);

