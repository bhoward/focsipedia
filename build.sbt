lazy val docs = project
  .in(file("focsipedia-docs"))
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    scalaVersion := "3.4.2",
    moduleName := "focsipedia-docs"
  )
