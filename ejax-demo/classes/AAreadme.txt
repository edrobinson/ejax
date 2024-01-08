The "classes" folder holds all of the site classes.

The files are named the same as the classes and are capitalized.
The class names are capitalized as well.

There are 2 classes per page:

Index.php     Is called by the site index.php to display the page.
              It just instances Smarty and does any initial assigns
              then displays the page template.


Index_c.php   Is called by the client to provide the services.
              Ejax.js provides methods to do an Ajax call and
              call the server's requested js methods to update the UI.


These 2 classes serve as examples for your usage.

Configeditor.php illustrates a utility editor that handles maintenance
of a site database table. In this case, the site's configuration options.

Configserver is the site's configuration option server that gets the value
of a requested configuration option from the config DB table.

crud.php is a dababase CRUD server that handles any table in the site 
database and provides a complete set of db services through a single
method.

I have included some classes used in a site that I maintain. They should 
provide a better idea of how this thing works.

The classes are autoloaded using the Composer classmap feature.

The page classes use a set of traits that saves a ton of replication
and eases maintenance.

The Pimple container class is used for D.I.