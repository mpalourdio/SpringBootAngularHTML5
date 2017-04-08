Spring Boot 1.5.x and Angular 4.x with HTML 5 router
====================================================

This project provides an example of an Angular single page application, served by ``Tomcat``,
configured with the ``html5 router``.

The [AngularConfig](src/main/java/com/mpalourdio/html5/config/AngularConfig.java) makes the magic here.

The ``base-href`` in configured by the ResourceResolver. It takes the value of the application context-path.

It's useful if you want to serve an Angular application with the ``html5 router``, and avoid the dashed URL.

This ``html5 router`` mode makes pretty URL, but has a default : Refreshing pages (or accessing them directly) gives a 404
http error if no RewriteRule is provided by the http server that serve the application or by an .htaccess.

Handling the ``base-href`` dynamically can be tricky too. Here it's done once and for all by the ResourceResolver.

This prject includes too a custom http interceptor. It's useful to show a loader during long http requests for example.

To test the project, run [Application](src/main/java/com/mpalourdio/html5/Application.java), and point your browser to [http://localhost:10000/my-context/path](http://localhost:10000/my-context).

If you want to play with the front part, go to the [front folder](front). Once you have built the project, put the files in [src/main/resources/static](src/main/resources/static).

The front-end part has been scaffolded with [angular-cli](https://github.com/angular/angular-cli).

