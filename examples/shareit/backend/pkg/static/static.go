// removed duplicate package declaration
package static

import (
	"net/http"
)

var StaticDir = "../../frontend/build"

func StaticFileHandler() http.Handler {
	fs := http.FileServer(http.Dir(StaticDir))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if len(r.URL.Path) >= 5 && r.URL.Path[:5] == "/api/" {
			http.NotFound(w, r)
			return
		}
		fs.ServeHTTP(w, r)
	})
}
