"""Static server with HTTP Range support (required for video seeking/scrubbing)."""
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8765


class RangeHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        range_header = self.headers.get('Range')

        if os.path.isdir(path) or not range_header:
            return super().send_head()

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, 'File not found')
            return None

        size = os.fstat(f.fileno()).st_size
        m = re.match(r'bytes=(\d*)-(\d*)', range_header)
        if not m:
            f.close()
            return super().send_head()

        start = int(m.group(1)) if m.group(1) else 0
        end = int(m.group(2)) if m.group(2) else size - 1
        end = min(end, size - 1)

        if start > end or start >= size:
            f.close()
            self.send_error(416, 'Requested Range Not Satisfiable')
            return None

        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()

        f.seek(start)
        self._range_remaining = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, '_range_remaining', None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        while remaining > 0:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


if __name__ == '__main__':
    print(f'Serving with Range support on http://localhost:{PORT}')
    ThreadingHTTPServer(('', PORT), RangeHandler).serve_forever()
