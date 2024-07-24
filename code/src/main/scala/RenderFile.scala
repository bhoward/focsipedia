package edu.depauw.bhoward

import doodle.core.*
import doodle.syntax.all.*
import doodle.java2d.* 
import cats.effect.unsafe.implicits.global
import doodle.core.format.Png
import doodle.image.Image

object RenderFile {
  def apply[A](picture: Picture[A], fileName: String): Unit = {
    picture.write[Png]("static/img/doodle/" + fileName)
    println("![Doodle](/img/doodle/" + fileName + ")")
  }

  def apply(image: Image, fileName: String): Unit = {
    image.compile.write[Png]("static/img/doodle/" + fileName)
    println("![Doodle](/img/doodle/" + fileName + ")")
  }
}
