"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4949],{6053:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var o=n(7462),i=(n(7294),n(3905));n(6340);const l={},a="Day 16: The Floor Will Be Lava",s={unversionedId:"2023/puzzles/day16",id:"2023/puzzles/day16",title:"Day 16: The Floor Will Be Lava",description:"By @iusildra",source:"@site/target/mdoc/2023/puzzles/day16.md",sourceDirName:"2023/puzzles",slug:"/2023/puzzles/day16",permalink:"/scala-advent-of-code/2023/puzzles/day16",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/2023/puzzles/day16.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 15: Lens Library",permalink:"/scala-advent-of-code/2023/puzzles/day15"},next:{title:"Day 17: Clumsy Crucible",permalink:"/scala-advent-of-code/2023/puzzles/day17"}},r={},c=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Solution summary",id:"solution-summary",level:2},{value:"Detailed solution explanation",id:"detailed-solution-explanation",level:2},{value:"Global model",id:"global-model",level:3},{value:"Part 1",id:"part-1",level:3},{value:"Part 2",id:"part-2",level:3},{value:"Full code",id:"full-code",level:2},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],m={toc:c};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"day-16-the-floor-will-be-lava"},"Day 16: The Floor Will Be Lava"),(0,i.kt)("p",null,"By ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/iusildra"},"@iusildra")),(0,i.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://adventofcode.com/2023/day/16"},"https://adventofcode.com/2023/day/16")),(0,i.kt)("h2",{id:"solution-summary"},"Solution summary"),(0,i.kt)("p",null,"The solution models the input as a grid with 3 types of cells:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Empty")," cells, which are traversable"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Mirror")," cells, redirecting the lava flow in a 90\xb0 angle"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Splitter")," cells, redirecting the lava flow only if it comes from a specific direction, otherwise it just flows through")),(0,i.kt)("p",null,"Then once we have the model with some helper functions, we can solve the problem by simulating the lava flow."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"We start by defining the origin of the lava flow"),(0,i.kt)("li",{parentName:"ol"},"Then we find the next cell the lava will flow to",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"If the cell is empty, we move the lava there"),(0,i.kt)("li",{parentName:"ol"},"If the cell is a mirror, we redirect the lava flow"),(0,i.kt)("li",{parentName:"ol"},"If the cell is a splitter, we split the flow if necessary"))),(0,i.kt)("li",{parentName:"ol"},"With the new lava flow (and its new direction), we repeat step 2 until we every path hits a wall")),(0,i.kt)("h2",{id:"detailed-solution-explanation"},"Detailed solution explanation"),(0,i.kt)("h3",{id:"global-model"},"Global model"),(0,i.kt)("p",null,"We start by defining the direction of the lava flow, which is a simple enum, and the coordinates of a cell (a case class):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"enum Direction:\n  case Up, Right, Down, Left\n\ncase class Coord(x: Int, y: Int)\n")),(0,i.kt)("p",null,"Then, we model the 3 kinds of cells. We need at least a position and a method to compute the next direction(s). For convenience, we'll also add methods to calculate the path to another cell / coordinate."),(0,i.kt)("p",null,'Even though a mirror can only "create" 1 new direction, because of splitters, we\'ll return a list of directions to limit code duplication.'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"sealed abstract class Element:\n  val pos: Coord\n  def nextDirection(comingFrom: Direction): List[Direction]\n  def pathTo(coord: Coord): Seq[Coord] =\n    if pos.x == coord.x then\n      if pos.y < coord.y then (pos.y to coord.y).map(Coord(pos.x, _))\n      else (coord.y to pos.y).map(Coord(pos.x, _))\n    else if (pos.x < coord.x) then (pos.x to coord.x).map(Coord(_, pos.y))\n    else (coord.x to pos.x).map(Coord(_, pos.y))\n\nobject Element:\n  def apply(sym: Char, x: Int, y: Int) =\n    sym match\n      case '\\\\' => BackslashMirror(Coord(x, y))\n      case '/'  => SlashMirror(Coord(x, y))\n      case '|'  => VSplitter(Coord(x, y))\n      case '-'  => HSplitter(Coord(x, y))\n      case _    => throw new IllegalArgumentException\n")),(0,i.kt)("p",null,"A mirror redirects the lava flow by 90\xb0, so we need to know where the lava is coming to to know where it will go next. (A lava flow coming to the right will go up with a ",(0,i.kt)("inlineCode",{parentName:"p"},"/"),"-mirror...)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"case class SlashMirror(override val pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case Direction.Up    => List(Direction.Right)\n      case Direction.Left  => List(Direction.Down)\n      case Direction.Right => List(Direction.Up)\n      case Direction.Down  => List(Direction.Left)\n\ncase class BackslashMirror(override val pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case Direction.Up    => List(Direction.Left)\n      case Direction.Right => List(Direction.Down)\n      case Direction.Down  => List(Direction.Right)\n      case Direction.Left  => List(Direction.Up)\n")),(0,i.kt)("p",null,"A splitter redirects the lava flow only if it encounters perpendicularly. Otherwise, it just lets the lava flow through."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"case class VSplitter(pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case d @ (Direction.Up | Direction.Down) => List(d)\n      case _ => List(Direction.Up, Direction.Down)\ncase class HSplitter(pos: Coord) extends Element:\n  def nextDirection(comingFrom: Direction) =\n    comingFrom match\n      case d @ (Direction.Left | Direction.Left) => List(d)\n      case _ => List(Direction.Left, Direction.Right)\n")),(0,i.kt)("p",null,"Finally, an empty cell has no behavior and shouldn't be traversed in this implementation."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"case class Empty(override val pos: Coord) extends Element:\n  def nextDirection(comingFrom: Direction): Nothing =\n    throw new UnsupportedOperationException\n")),(0,i.kt)("p",null,"Now that we have the model, we can parse the input and create a sparse grid of cells."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Beware of terminology, a sparse collection is a collection that is optimised for representing a few non-empty elements in a mostly empty space. A sparse collection is useful because when searching for the next cell, we can just look at the next/previous element in the collection instead of iterating and skipping-over empty elements.")),(0,i.kt)("p",null,"To do so, we need to ",(0,i.kt)("inlineCode",{parentName:"p"},"map")," over each line with their index (to get the ",(0,i.kt)("inlineCode",{parentName:"p"},"y")," coordinate) and for each character of a line, if it is not an empty cell, we create the corresponding element."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"def findElements(source: Array[String]): Array[IndexedSeq[Element]] =\n  source.zipWithIndex\n    .map: (line, y) =>\n      line.zipWithIndex\n        .filter(_._1 != '.')\n        .map { (sym, x) => Element(sym, x, y) }\n")),(0,i.kt)("p",null,"Now we have everything we need to solve the problem. Until the end, every piece of code will be in a single method called ",(0,i.kt)("inlineCode",{parentName:"p"},"solution"),", for convenience (I don't need to pass several arguments to my helper functions). The solver needs to know the input, but also the starting point of the lava flow as well as its direction (which can be ambiguous if it starts on a corner)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"def solution(input: Array[String], origin: Coord, dir: Direction) =\n")),(0,i.kt)("p",null,"Then, we'll use some more memory to have faster access to the elements and avoid recomputing the same path several times."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"elements")," is a sparse grid of elements (only used as an intermediate step)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"elementsByRow")," is a map of ",(0,i.kt)("inlineCode",{parentName:"li"},"y")," coordinates to the elements on that row, to quickly to find the next cell in the same row"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"elementsByColumn")," is a map of ",(0,i.kt)("inlineCode",{parentName:"li"},"x")," coordinates to the elements on that column, to quickly to find the next cell in the same column"),(0,i.kt)("li",{parentName:"ul"},"Since we have a sparse collection, the coordinates of the elements to not match the coordinates of the input, so we need to find the min/max ",(0,i.kt)("inlineCode",{parentName:"li"},"x")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"y")," values of the elements to know when to stop the simulation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"activated")," is a grid of booleans to know if a cell has already been activated by the lava flow. Note: ",(0,i.kt)("inlineCode",{parentName:"li"},"Array")," is a mutable type")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"  // still in the solution method\n  val elements = findElements(input)\n  val elementsByRow = elements.flatten.groupBy(_.pos.y)\n  val elementsByColumn = elements.flatten.groupBy(_.pos.x)\n  val minY = elementsByColumn.map((k, v) => (k, v(0).pos.y))\n  val maxY = elementsByColumn.map((k, v) => (k, v.last.pos.y))\n  val minX = elementsByRow.map((k, v) => (k, v(0).pos.x))\n  val maxX = elementsByRow.map((k, v) => (k, v.last.pos.x))\n  val activated = Array.fill(input.length)(Array.fill(input(0).length())(false))\n")),(0,i.kt)("p",null,"To find the next element in the lava flow, we only need the current element and the direction of the lava flow. But since we are using sparse collections, we cannot just check if ",(0,i.kt)("inlineCode",{parentName:"p"},"x > 0")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"x < line.size"),". An input's line can have 10 elements but only 4 non-",(0,i.kt)("inlineCode",{parentName:"p"},"Empty")," ones, so calling the 5-th element would crash with an ",(0,i.kt)("inlineCode",{parentName:"p"},"IndexOutOfBoundsExceptions"),"."),(0,i.kt)("p",null,'Yet, this constraint comes with a benefit, we can just check if the next element is in the collection or not, and "jump" to it if it is. If it is not, we can just return an ',(0,i.kt)("inlineCode",{parentName:"p"},"Empty")," cell (which will later be used to stop the simulation)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"  // still in the solution method\n  def findNext(\n        elem: Element,\n        goingTo: Direction\n    ): Element =\n      goingTo match\n        case Direction.Left if elem.pos.x > minX(elem.pos.y) =>\n          val byRow = elementsByRow(elem.pos.y)\n          byRow(byRow.indexOf(elem) - 1)\n        case Direction.Left =>\n          Empty(Coord(0, elem.pos.y))\n        case Direction.Right if elem.pos.x < maxX(elem.pos.y) =>\n          val byRow = elementsByRow(elem.pos.y)\n          byRow(byRow.indexOf(elem) + 1)\n        case Direction.Right =>\n          Empty(Coord(input(0).length() - 1, elem.pos.y))\n        case Direction.Up if elem.pos.y > minY(elem.pos.x) =>\n          val byCol = elementsByColumn(elem.pos.x)\n          byCol(byCol.indexOf(elem) - 1)\n        case Direction.Up =>\n          Empty(Coord(elem.pos.x, 0))\n        case Direction.Down if elem.pos.y < maxY(elem.pos.x) =>\n          val byCol = elementsByColumn(elem.pos.x)\n          byCol(byCol.indexOf(elem) + 1)\n        case Direction.Down =>\n          Empty(Coord(elem.pos.x, input.length - 1))\n")),(0,i.kt)("p",null,"Also, we might use a method to activate the cells:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"  // still in the solution method\n  def activate(from: Element, to: Coord) =\n    from\n      .pathTo(to)\n      .foreach:\n        case Coord(x, y) => activated(y)(x) = true\n")),(0,i.kt)("p",null,"Time to simulate the lava flow. We'll use a recursive method, but there are some caveats:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"We'll use tail-recursion call to be stack-safe, but with one splitters giving multiple directions, we need to go over one, then over the second etc... which it not tail-recursive."),(0,i.kt)("li",{parentName:"ul"},"We need to keep a record of all the cells we've visited, and from where we came from, to avoid recomputing the same path several times. (Also called memoization)")),(0,i.kt)("p",null,"The first caveat can easily be solved by using a ",(0,i.kt)("inlineCode",{parentName:"p"},"Queue")," (same idea as in the breadth-first search algorithm) to store the next cells to visit. This way when encountering an element giving us multiple directions, we'll just ",(0,i.kt)("inlineCode",{parentName:"p"},"enqueue")," them and visit them later."),(0,i.kt)("p",null,"The second one is a bit less straightforward. We need to be sure that our store won't prevent us from visiting a cell. For instance, with the following input:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"...vv...\n...vv...\n../vv/..\n...vv...\n")),(0,i.kt)("p",null,"Coming from the top of the right ",(0,i.kt)("inlineCode",{parentName:"p"},"/")," mirror, we must be able to reach the left ",(0,i.kt)("inlineCode",{parentName:"p"},"/")," mirror. One solution is to store the tuple of ",(0,i.kt)("inlineCode",{parentName:"p"},"source")," cell and ",(0,i.kt)("inlineCode",{parentName:"p"},"destination")," cell using a ",(0,i.kt)("inlineCode",{parentName:"p"},"Set")," (for efficient search among unindexed elements)"),(0,i.kt)("p",null,"The resulting method looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"  // still in the solution method\n  @tailrec // to let the compiler warn us if it's not tail-recursive\n  def loop(\n      elems: Queue[(Element, Direction)],\n      memo: Set[(Coord, Coord)]\n  ): Unit =\n    if elems.isEmpty then ()\n    else elems.dequeue match\n      case ((_: Empty, _), _) => throw new UnsupportedOperationException\n      case ((elem, goingTo), rest) =>\n        val nextElems =\n          elem\n            .nextDirection(goingTo)\n            .foldLeft((rest, memo)): (acc, dir) =>\n              val followup = findNext(elem, dir)\n              if (memo.contains((elem.pos, followup.pos))) then acc\n              else\n                activate(elem, followup.pos)\n                followup match\n                  case Empty(pos) => (acc._1, acc._2 + ((elem.pos, pos)))\n                  case next =>\n                    (acc._1.enqueue(next -> dir), acc._2 + ((elem.pos, followup.pos)))\n      loop(nextElems._1, nextElems._2)\n  end loop\n")),(0,i.kt)("p",null,"As long as there are elements in the queue, we dequeue and look for the next direction(s). The ",(0,i.kt)("inlineCode",{parentName:"p"},"foldLeft")," allows us to activate & enqueue the next cells, and to update the memo before passing to the next direction. Once every direction has been explored, we call the method again with the new elements to visit"),(0,i.kt)("p",null,"Finally, we need to make the first call to the ",(0,i.kt)("inlineCode",{parentName:"p"},"loop")," method in the ",(0,i.kt)("inlineCode",{parentName:"p"},"solution")," method. The first element to visit can be computed based on the starting point and the direction of the lava flow. Then we activate the cells on the path and call the ",(0,i.kt)("inlineCode",{parentName:"p"},"loop")," method."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"  // still in the solution method\n  val starting = dir match\n    case Direction.Right => elementsByRow(origin.y)(0)\n    case Direction.Down  => elementsByColumn(origin.x)(0)\n    case Direction.Left  => elementsByRow(origin.y).last\n    case Direction.Up    => elementsByColumn(origin.x).last\n\n  activate(starting, origin)\n  loop(Queue(starting -> dir), Set())\n\n  // println(activated.zipWithIndex.map((line, i) => f\"$i%03d \" + line.map(if _ then '#' else '.').mkString).mkString(\"\\n\"))\n  activated.flatten.count(identity)\nend solution\n")),(0,i.kt)("p",null,"Once the simulation is done, and all the cells have been activated, we just need to count the number of activated cells. (there is a ",(0,i.kt)("inlineCode",{parentName:"p"},"println")," commented out to see the lava flow)"),(0,i.kt)("h3",{id:"part-1"},"Part 1"),(0,i.kt)("p",null,"For the first part, we just need to call the ",(0,i.kt)("inlineCode",{parentName:"p"},"solution")," method with the starting point and the direction of the lava flow"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def part1(input: String) =\n  solution(input.split("\\n"), Coord(0, 0), Direction.Right)\n')),(0,i.kt)("h3",{id:"part-2"},"Part 2"),(0,i.kt)("p",null,"Here we need to find the starting point and direction that maximize the number of activated cells. To do so, we'll just try every possible combination and keep the best one."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def part2(input: String) =\n  val lines = input.split("\\n")\n  val horizontal = (0 until lines.length).flatMap: i =>\n    List(\n      (Coord(0, i), Direction.Right),\n      (Coord(lines(0).length() - 1, i), Direction.Left)\n    )\n  val vertical = (0 until lines(0).length()).flatMap: i =>\n    List(\n      (Coord(i, 0), Direction.Down),\n      (Coord(i, lines.length - 1), Direction.Up)\n    )\n  val borders = horizontal ++ vertical\n  borders.map((coord, dir) => solution(lines, coord, dir)).max\n')),(0,i.kt)("h2",{id:"full-code"},"Full code"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"import scala.annotation.tailrec\nimport scala.collection.immutable.Queue\nimport scala.collection.mutable.Buffer\n\n/* -------------------------------------------------------------------------- */\n/*                                   Global                                   */\n/* -------------------------------------------------------------------------- */\nenum Direction:\n  case Up, Right, Down, Left\n\ncase class Coord(x: Int, y: Int)\n\nsealed abstract class Element:\n  val pos: Coord\n  def nextDirection(comingFrom: Direction): List[Direction]\n  def pathTo(coord: Coord): Seq[Coord] =\n    if pos.x == coord.x then\n      if pos.y < coord.y then (pos.y to coord.y).map(Coord(pos.x, _))\n      else (coord.y to pos.y).map(Coord(pos.x, _))\n    else if (pos.x < coord.x) then (pos.x to coord.x).map(Coord(_, pos.y))\n    else (coord.x to pos.x).map(Coord(_, pos.y))\n\nobject Element:\n  def apply(sym: Char, x: Int, y: Int) =\n    sym match\n      case '\\\\' => BackslashMirror(Coord(x, y))\n      case '/'  => SlashMirror(Coord(x, y))\n      case '|'  => VSplitter(Coord(x, y))\n      case '-'  => HSplitter(Coord(x, y))\n      case _    => throw new IllegalArgumentException\n\ncase class SlashMirror(override val pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case Direction.Up    => List(Direction.Right)\n      case Direction.Left  => List(Direction.Down)\n      case Direction.Right => List(Direction.Up)\n      case Direction.Down  => List(Direction.Left)\n\ncase class BackslashMirror(override val pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case Direction.Up    => List(Direction.Left)\n      case Direction.Right => List(Direction.Down)\n      case Direction.Down  => List(Direction.Right)\n      case Direction.Left  => List(Direction.Up)\n\ncase class VSplitter(pos: Coord) extends Element:\n  def nextDirection(goingTo: Direction) =\n    goingTo match\n      case d @ (Direction.Up | Direction.Down) => List(d)\n      case _ => List(Direction.Up, Direction.Down)\ncase class HSplitter(pos: Coord) extends Element:\n  def nextDirection(comingFrom: Direction) =\n    comingFrom match\n      case d @ (Direction.Left | Direction.Left) => List(d)\n      case _ => List(Direction.Left, Direction.Right)\n\ncase class Empty(pos: Coord) extends Element:\n  def nextDirection(comingFrom: Direction): Nothing =\n    throw new UnsupportedOperationException\n\ndef findElements(source: Array[String]) =\n  source.zipWithIndex\n    .map: (line, y) =>\n      line.zipWithIndex\n        .filter(_._1 != '.')\n        .map { (sym, x) => Element(sym, x, y) }\n\ndef solution(input: Array[String], origin: Coord, dir: Direction) =\n  val elements = findElements(input)\n  val elementsByRow = elements.flatten.groupBy(_.pos.y)\n  val elementsByColumn = elements.flatten.groupBy(_.pos.x)\n  val minY = elementsByColumn.map((k, v) => (k, v(0).pos.y))\n  val maxY = elementsByColumn.map((k, v) => (k, v.last.pos.y))\n  val minX = elementsByRow.map((k, v) => (k, v(0).pos.x))\n  val maxX = elementsByRow.map((k, v) => (k, v.last.pos.x))\n  val activated = Array.fill(input.length)(Array.fill(input(0).length())(false))\n  // val memo = Set.empty[(Coord, Coord)]\n  def findNext(\n      elem: Element,\n      goingTo: Direction\n  ): Element =\n    goingTo match\n      case Direction.Left if elem.pos.x > minX(elem.pos.y) =>\n        val byRow = elementsByRow(elem.pos.y)\n        byRow(byRow.indexOf(elem) - 1)\n      case Direction.Left =>\n        Empty(Coord(0, elem.pos.y))\n      case Direction.Right if elem.pos.x < maxX(elem.pos.y) =>\n        val byRow = elementsByRow(elem.pos.y)\n        byRow(byRow.indexOf(elem) + 1)\n      case Direction.Right =>\n        Empty(Coord(input(0).length() - 1, elem.pos.y))\n      case Direction.Up if elem.pos.y > minY(elem.pos.x) =>\n        val byCol = elementsByColumn(elem.pos.x)\n        byCol(byCol.indexOf(elem) - 1)\n      case Direction.Up =>\n        Empty(Coord(elem.pos.x, 0))\n      case Direction.Down if elem.pos.y < maxY(elem.pos.x) =>\n        val byCol = elementsByColumn(elem.pos.x)\n        byCol(byCol.indexOf(elem) + 1)\n      case Direction.Down =>\n        Empty(Coord(elem.pos.x, input.length - 1))\n\n  def activate(from: Element, to: Coord) =\n    from\n      .pathTo(to)\n      .foreach:\n        case Coord(x, y) => activated(y)(x) = true\n\n  @tailrec\n  def loop(\n      elems: Queue[(Element, Direction)],\n      memo: Set[(Coord, Coord)]\n  ): Unit =\n    if elems.isEmpty then ()\n    else\n      elems.dequeue match\n        case ((_: Empty, _), _) => throw new UnsupportedOperationException\n        case ((elem, goingTo), rest) =>\n          val nextElems =\n            elem\n              .nextDirection(goingTo)\n              .foldLeft((rest, memo)): (acc, dir) =>\n                val followup = findNext(elem, dir)\n                if (memo.contains((elem.pos, followup.pos))) then acc\n                else\n                  activate(elem, followup.pos)\n                  followup match\n                    case Empty(pos) => (acc._1, acc._2 + ((elem.pos, pos)))\n                    case next =>\n                      (acc._1.enqueue(next -> dir), acc._2 + ((elem.pos, followup.pos)))\n          loop(nextElems._1, nextElems._2)\n  end loop\n\n  val starting = dir match\n    case Direction.Right => elementsByRow(origin.y)(0)\n    case Direction.Down  => elementsByColumn(origin.x)(0)\n    case Direction.Left  => elementsByRow(origin.y).last\n    case Direction.Up    => elementsByColumn(origin.x).last\n\n  activate(starting, origin)\n  loop(Queue(starting -> dir), Set())\n\n  // println(activated.zipWithIndex.map((line, i) => f\"$i%03d \" + line.map(if _ then '#' else '.').mkString).mkString(\"\\n\"))\n  activated.flatten.count(identity)\n\n/* -------------------------------------------------------------------------- */\n/*                                   Part I                                   */\n/* -------------------------------------------------------------------------- */\ndef part1(input: String) =\n  solution(input.split(\"\\n\"), Coord(0, 0), Direction.Right)\n\n/* -------------------------------------------------------------------------- */\n/*                                   Part II                                  */\n/* -------------------------------------------------------------------------- */\ndef part2(input: String) =\n  val lines = input.split(\"\\n\")\n  val horizontal = (0 until lines.length).flatMap: i =>\n    List(\n      (Coord(0, i), Direction.Right),\n      (Coord(lines(0).length() - 1, i), Direction.Left)\n    )\n  val vertical = (0 until lines(0).length()).flatMap: i =>\n    List(\n      (Coord(i, 0), Direction.Down),\n      (Coord(i, lines.length - 1), Direction.Up)\n    )\n  val borders = horizontal ++ vertical\n  borders.map((coord, dir) => solution(lines, coord, dir)).max\n")),(0,i.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/jnclt/adventofcode2023/blob/main/day16/floor-will-be-lava.sc"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/jnclt"},"jnclt")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/spamegg1/advent-of-code-2023-scala/blob/solutions/16.worksheet.sc#L131"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/spamegg1/"},"Spamegg")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/beneyal/aoc-2023/blob/main/src/main/scala/day16.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/beneyal/"},"Ben Eyal")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/advent-of-code-2023/blob/main/Day16.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/"},"Rui Alves")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/merlinorg/aoc2023/blob/main/src/main/scala/Day16.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/merlinorg/"},"merlin")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/GrigoriiBerezin/advent_code_2023/tree/master/task15/src/main/scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/GrigoriiBerezin"},"g.berezin"))),(0,i.kt)("p",null,"Share your solution to the Scala community by editing this page.\nYou can even write the whole article! ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/scalacenter/scala-advent-of-code/discussions/424"},"See here for the expected format")))}p.isMDXComponent=!0}}]);