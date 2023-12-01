(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{398:function(t,i,n){"use strict";n.r(i);var e=n(5),a=Object(e.a)({},(function(){var t=this,i=t._self._c;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h2",{attrs:{id:"_1-junit-5-architecture"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#_1-junit-5-architecture"}},[t._v("#")]),t._v(" 1. JUnit 5 Architecture")]),t._v(" "),i("p",[t._v("从历史上看，JUnit 4是单一的，并不是为了与流行的构建工具(Maven和Gradle)和ide (Eclipse、NetBeans和IntelliJ)交互而设计的。这些工具与JUnit 4紧密耦合，并且经常依赖于反射来获取必要的信息。这带来了一些挑战，例如，如果JUnit的设计者决定更改私有变量的名称，这个更改可能会影响反射式访问它的工具。")]),t._v(" "),i("p",[t._v("JUnit 5在框架中引入了模块化方法，它允许JUnit与使用不同工具和ide的不同编程客户端进行交互。它以api的形式引入了以下关注点的逻辑分离:")]),t._v(" "),i("p",[t._v("编写测试的API，主要供开发人员使用\n一种发现和运行测试的机制\n允许与ide和工具轻松交互并从中运行测试的API\n因此，JUnit 5由来自三个不同子项目的几个不同模块组成:")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[t._v("JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage\n")])])]),i("ul",[i("li",[i("p",[t._v("JUnit Platform: 为了能够启动单元测试，IDE、构建工具或插件需要包含和扩展平台api。它定义了用于开发在平台上运行的新测试框架的TestEngine API。它还提供了一个控制台启动器，用于从命令行启动平台，并为Gradle和Maven构建插件。")])]),t._v(" "),i("li",[i("p",[t._v("JUnit Jupiter: 它包括用于编写测试的新编程和扩展模型。它有所有新的junit注释和TestEngine实现，可以运行用这些注释编写的测试。")])]),t._v(" "),i("li",[i("p",[t._v("JUnit Vintage: 它的主要目的是支持在JUnit 5平台上运行JUnit 3和JUnit 4编写的测试。它是向后兼容的。它要求在类路径或模块路径上存在JUnit 4.12或更高版本。")])])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://howtodoinjava.com/wp-content/uploads/2021/11/JUnit-5-Architecture.png",alt:"JUnit5 Architecture"}})]),t._v(" "),i("h2",{attrs:{id:"_2-junit-5-maven-dependencies"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#_2-junit-5-maven-dependencies"}},[t._v("#")]),t._v(" 2. JUnit 5 Maven Dependencies")]),t._v(" "),i("p",[t._v("JUnit的第5版是模块化的;您不能再简单地将jar文件添加到项目编译类路径和执行类路径中。您可以在Maven或Gradle项目中使用JUnit 5，方法是包含项目中所需的依赖项。")]),t._v(" "),i("p",[t._v("让我们从简单地看一下在实际应用程序中常用的构件开始:")]),t._v(" "),i("ul",[i("li",[t._v("junit-jupiter-api: 它是所有核心注释所在的主模块，比如@Test、生命周期方法注释和断言。")]),t._v(" "),i("li",[t._v("junit-jupiter-engine: 它具有在运行时执行测试所需的测试引擎实现。")]),t._v(" "),i("li",[t._v("junit-jupiter-params: 它提供对参数化测试的支持")]),t._v(" "),i("li",[t._v("junit-platform-suite: 它提供了@Suite支持，使遗留的JUnit 4的JUnitPlatform运行器过时。")]),t._v(" "),i("li",[t._v("junit-vintage-engine: 它包含执行用JUnit 3或4编写的测试的引擎实现。为此，当然还需要JUnit 3或4 jar。")])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://howtodoinjava.com/wp-content/uploads/2021/11/JUnit-Modules.jpg",alt:"JUnit5 Modules"}})])])}),[],!1,null,null,null);i.default=a.exports}}]);