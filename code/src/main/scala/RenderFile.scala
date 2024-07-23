package edu.depauw.bhoward

import doodle.core.*
import doodle.syntax.all.*
import doodle.java2d.* 
import cats.effect.unsafe.implicits.global
import doodle.core.format.Png

object RenderFile {
  def apply[A](picture: Picture[A], fileName: String): Unit = {
    picture.write[Png]("static/img/doodle/" + fileName)
    println("![Doodle](/img/doodle/" + fileName + ")")
  }
}
