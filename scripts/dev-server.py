#!/usr/bin/env python3
"""Local dev server that disables caching, so CSS/JS edits show up on a plain refresh.

python3's `http.server` sends no Cache-Control header, which lets browsers cache
aggressively on normal reloads -- confusing during active styling work. This wrapper
just adds `Cache-Control: no-store` to every response.
"""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
	def end_headers(self):
		self.send_header("Cache-Control", "no-store")
		super().end_headers()


if __name__ == "__main__":
	port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
	HTTPServer(("", port), NoCacheHandler).serve_forever()
