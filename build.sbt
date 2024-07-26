lazy val main = project
  .in(file("code"))
  .settings(
    scalaVersion := "3.4.2",
    libraryDependencies += "org.creativescala" %% "doodle" % "0.23.0"
  )

lazy val docs = project
  .in(file("focsipedia-docs"))
  .dependsOn(main)
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    scalaVersion := "3.4.2",
    moduleName := "focsipedia-docs",
    
  )
