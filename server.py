#!/usr/bin/env python
import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

HandlerClass = SimpleHTTPRequestHandler
ServerClass = BaseHTTPServer.HTTPServer


HandlerClass.protocol_version = 'HTTP/1.1'
httpd = ServerClass(('', 80), HandlerClass)

sa = httpd.socket.getsockname()

print "serving"
httpd.serve_forever()
