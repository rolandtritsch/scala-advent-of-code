"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[738],{5726:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>p});var n=i(7462),s=(i(7294),i(3905)),a=i(6340);const l={},r="Day 8: Treetop Tree House",d={unversionedId:"2022/puzzles/day08",id:"2022/puzzles/day08",title:"Day 8: Treetop Tree House",description:"Puzzle description",source:"@site/target/mdoc/2022/puzzles/day08.md",sourceDirName:"2022/puzzles",slug:"/2022/puzzles/day08",permalink:"/scala-advent-of-code/2022/puzzles/day08",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/2022/puzzles/day08.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 7: No Space Left On Device",permalink:"/scala-advent-of-code/2022/puzzles/day07"},next:{title:"Day 1: Sonar Sweep",permalink:"/scala-advent-of-code/puzzles/day1"}},o={},p=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Final Code",id:"final-code",level:2},{value:"Run it in the browser",id:"run-it-in-the-browser",level:3},{value:"Part 1",id:"part-1",level:4},{value:"Part 2",id:"part-2",level:4},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],c={toc:p};function u(e){let{components:t,...i}=e;return(0,s.kt)("wrapper",(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"day-8-treetop-tree-house"},"Day 8: Treetop Tree House"),(0,s.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://adventofcode.com/2022/day/8"},"https://adventofcode.com/2022/day/8")),(0,s.kt)("h2",{id:"final-code"},"Final Code"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},"def part1(input: String): Int =\n  visibilityField.megaMap(if _ then 1 else 0).megaReduce(_ + _)\n\ndef part2(input: String): Int =\n  scoreField.megaReduce(_ max _)\n\ntype Field[A] = List[List[A]]\n\nextension [A](xss: Field[A])\n  def megaZip[B](yss: Field[B]): Field[(A, B)] = (xss zip yss).map( (xs, ys) => xs zip ys )\n  def megaMap[B](f: A => B): Field[B] = xss.map(_.map(f))\n  def megaReduce(f: (A,A) => A): A = xss.map(_.reduce(f)).reduce(f)\n\ndef combine[A](op: ((A,A)) => A)(f1: Field[A], f2: Field[A]): Field[A] = f1.megaZip(f2).megaMap(op)\n\ndef computeInAllDirections[A, B](xss: Field[A], f: Field[A] => Field[B]): List[Field[B]] =\n  for (transpose, reverse) <- List( (false, false), (false, true), (true, false), (true, true) )\n  yield {\n    println(xss.map(_.length))\n    val t = if transpose then xss.transpose else xss \n    val in = if reverse then t.map(_.reverse) else t\n    val res = f(in)\n    val r = if reverse then res.map(_.reverse) else res\n    val out = if transpose then r.transpose else r\n    out\n  }\n\ntype HeightField = Field[Int]\ntype ScoreField = Field[Int]\n\ntype VisibilityField = Field[Boolean]\n\nval parsed: HeightField = input.split(\"\\n\").map(line => line.map(char => char.toInt - '0').toList).toList\n\ndef computeVisibility(ls: HeightField): VisibilityField = ls.map{ line =>\n    line.scanLeft((-1, false)){ case ((prev, _), curr ) => (Math.max(prev, curr), curr > prev)}.tail.map(_._2)\n  }\n\nval visibilityField: VisibilityField = computeInAllDirections(parsed, computeVisibility).reduce(combine(_ | _))\n\n\ndef computeScore(ls: HeightField) = ls.map{ line =>\n  val distances = line.scanRight((-1, List.fill(10)(0))){ case (curr, (_, lengths)) =>\n    val newLengths = lengths.zipWithIndex.map{ case (v, i) => if i <= curr then 1 else v+1 }\n    (lengths(curr), newLengths)\n  }\n  distances.map(_._1).init\n}\n\nval scoreField: ScoreField = computeInAllDirections(parsed, computeScore).reduce(combine(_ * _))\n")),(0,s.kt)("h3",{id:"run-it-in-the-browser"},"Run it in the browser"),(0,s.kt)("h4",{id:"part-1"},"Part 1"),(0,s.kt)(a.Z,{puzzle:"day06-part1",year:"2022",mdxType:"Solver"}),(0,s.kt)("h4",{id:"part-2"},"Part 2"),(0,s.kt)(a.Z,{puzzle:"day06-part2",year:"2022",mdxType:"Solver"}),(0,s.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,s.kt)("p",null,"Share your solution to the Scala community by editing this page."))}u.isMDXComponent=!0}}]);