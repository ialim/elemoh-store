import { NextRequest, NextResponse } from "next/server";

const signedinPages = [
  "/",
  "/facets",
  "/create-facet",
  "/update-facet",
  "/create-product",
];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
