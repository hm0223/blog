---
title: Junit5 Tutorial
date: 2023-12-01
tags:
- Java
- Tutorial
- Test
author: huwenfeng
location: shanghai
---

本JUnit 5教程讨论了JUnit如何适应Java 8的编码风格以及JUnit 5库的其他几个新特性。另外，了解JUnit 5与JUnit 4的不同之处。

JUnit是Java应用程序中使用最广泛的测试框架。JUnit是在Java中编写单元测试的标准框架。它在GitHub上开源，使用Eclipse公共许可证。

很长一段时间以来，JUnit 4一直在完美地完成它的工作。在此期间，JDK 8为Java带来了迷人的特性，最值得注意的是lambda表达式。JUnit 5旨在适应Java 8的编码风格;这就是为什么Java 8是在JUnit 5中创建和执行测试的最低要求版本(尽管为了向后兼容，可以运行用JUnit 3或JUnit 4编写的测试)。


## 1. JUnit 5 Architecture
从历史上看，JUnit 4是单一的，并不是为了与流行的构建工具(Maven和Gradle)和ide (Eclipse、NetBeans和IntelliJ)交互而设计的。这些工具与JUnit 4紧密耦合，并且经常依赖于反射来获取必要的信息。这带来了一些挑战，例如，如果JUnit的设计者决定更改私有变量的名称，这个更改可能会影响反射式访问它的工具。

JUnit 5在框架中引入了模块化方法，它允许JUnit与使用不同工具和ide的不同编程客户端进行交互。它以api的形式引入了以下关注点的逻辑分离:

编写测试的API，主要供开发人员使用
一种发现和运行测试的机制
允许与ide和工具轻松交互并从中运行测试的API
因此，JUnit 5由来自三个不同子项目的几个不同模块组成:
```
JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage
```

- JUnit Platform: 为了能够启动单元测试，IDE、构建工具或插件需要包含和扩展平台api。它定义了用于开发在平台上运行的新测试框架的TestEngine API。它还提供了一个控制台启动器，用于从命令行启动平台，并为Gradle和Maven构建插件。


- JUnit Jupiter: 它包括用于编写测试的新编程和扩展模型。它有所有新的junit注解和TestEngine实现，可以运行用这些注解编写的测试。


- JUnit Vintage: 它的主要目的是支持在JUnit 5平台上运行JUnit 3和JUnit 4编写的测试。它是向后兼容的。它要求在类路径或模块路径上存在JUnit 4.12或更高版本。

![JUnit5 Architecture](https://howtodoinjava.com/wp-content/uploads/2021/11/JUnit-5-Architecture.png)


## 2. JUnit 5 Maven Dependencies

JUnit的第5版是模块化的;您不能再简单地将jar文件添加到项目编译类路径和执行类路径中。您可以在Maven或Gradle项目中使用JUnit 5，方法是包含项目中所需的依赖项。

让我们从简单地看一下在实际应用程序中常用的构件开始:

- junit-jupiter-api: 它是所有核心注解所在的主模块，比如@Test、[生命周期方法注解]()和[断言]()。
- junit-jupiter-engine: 它具有在运行时执行测试所需的测试引擎实现。
- junit-jupiter-params: 它提供对参数化测试的支持
- junit-platform-suite: 它提供了[@Suite]()支持，使遗留的JUnit 4的JUnitPlatform运行器过时。
- junit-vintage-engine: 它包含执行用JUnit 3或4编写的测试的引擎实现。为此，当然还需要JUnit 3或4 jar。

![JUnit5 Modules](https://howtodoinjava.com/wp-content/uploads/2021/11/JUnit-Modules.jpg)


## 3. JUnit 5 Annotations

### 3.1. Inbuilt Annotations
JUnit 5 提供了下面的内置注解供咱们编写单元测试.

用@BeforeAll， @AfterAll， @BeforeEach或@AfterEach直接注解或元注解的方法称为生命周期方法。

| Annotation                                                                                                                                            | Description                                        |
|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| [@BeforeEach](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)            | 每个测试方法执行前执行                                        |
| [@AfterEach](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)             | 每个测试方法执行后执行                                        |
| [@BeforeAll](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)             | 每个测试类执行前执行操作, 方法必须是静态的                             |
| [@AfterAll](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)              | 每个测试类执行后执行操作, 方法必须是静态的                             |
| @Test                                                                                                                                                 | 标记为 Junit 要测试的方法                                   |
| [@DisplayName](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)           | 测试方法显示的名称（别名）                                      |
| [@Disable](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5LifecycleTest.java)               | 禁用或忽略测试套件中的测试类或测试方法                                |
| [@Nested](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5NestedTest.java)                                                                                                                                           | 用于创建嵌套的测试类                                         |
| [@Tag](https://howtodoinjava.com/junit5/junit-5-tag-annotation-example/)                                                                              | 为测试发现和过滤标记测试方法或测试类                                 |
| @TestFactory                                                                                                                                          | 将方法标记为用于动态测试的测试工厂                                  |
| [@ParameterizedTest](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/Junit5ParameterizedTest.java) | 表示方法是参数化测试                                         |
| [@RepeatedTest](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/Junit5RepeatedTest.java)           | 表示方法是用于重复测试的测试模板                                   |
| [@TestClassOrder](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/JUnit5NestedTest.java)                                                                             | 用于在注释的测试类中为“@Nested”测试类配置测试类的执行顺序。                 |
| [@TestMethodOrder](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/Junit5OrderedTest.java)                                                                            | 用于为注释的测试类配置测试方法的执行顺序;类似于JUnit 4的*@FixMethodOrder*  |
| [@Timeout](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/Junit5TimeoutTest.java)                                                                                                 | 如果测试、测试工厂、测试模板或生命周期方法的执行超过给定的持续时间，则用于使其失败          |
| [@TempDir](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/Junit5TempDirTest.java)                                                                             | 用于在生命周期方法或测试方法中通过字段注入或参数注入提供临时目录                   |


### 3.2. Custom Composed Annotations

我们可以创建组合注解来自动继承既有注解的功能

例如, 不需要复制粘贴@Tag(“development”)，我们可以创建一个组合注释@Dev，如下所示:

```java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Tag("development")
public @interface Dev {
}
```

然后我们可以在必须在开发环境上执行的测试中使用@Dev注释。这使得以后如果需要，可以很容易地更改环境名称，而无需修改所有测试类。
```java
class Test {
    @Dev
    @Test
    void someTest() {
    // ...
    }
}
```

## 4. JUnit 5 Test Example
在测试编写风格方面，JUnit 4和JUnit 5没有太大的变化。

测试类是任何包含至少一个测试方法的顶级类、静态成员类或@Nested类。测试类不能是抽象的，而且必须只有一个构造函数。
测试方法是使用@Test、@RepeatedTest、@ParameterizedTest、@TestFactory或@TestTemplate注释编写的。
测试类、测试方法和生命周期方法不需要是公共的，但是它们不能是私有的。建议使用public修饰符。
以下是带有其生命周期方法的示例测试。注意，所有注解都来自org.junit.jupiter.api包。

```java
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import com.howtodoinjava.junit5.examples.Calculator;
public class AppTest {
  @BeforeAll
  static void setup(){
    System.out.println("@BeforeAll executed");
  }
  @BeforeEach
  void setupThis(){
    System.out.println("@BeforeEach executed");
  }
  @Tag("DEV")
  @Test
  void testCalcOne() {
    System.out.println("======TEST ONE EXECUTED=======");
    Assertions.assertEquals( 4 , Calculator.add(2, 2));
  }
  @Tag("PROD")
  @Disabled
  @Test
  void testCalcTwo(){
    System.out.println("======TEST TWO EXECUTED=======");
    Assertions.assertEquals( 6 , Calculator.add(2, 4));
  }
  @AfterEach
  void tearThis(){
    System.out.println("@AfterEach executed");
  }
  @AfterAll
  static void tear(){
    System.out.println("@AfterAll executed");
  }
}
```


## 5. Writing JUnit 5 Test Suites
> 为何会有测试套件？ 当测试类很多的时候 总不能一个一个点击测试执行（需要支持批量操作）

使用JUnit 5测试套件，您可以将测试分散到多个测试类和不同的包中。JUnit 5提供了这些注释来创建测试套件。

- @Suite 
- @SelectClasses 
- @SelectPackages 
- @IncludePackages 
- @ExcludePackages 
- @IncludeClassNamePatterns 
- @ExcludeClassNamePatterns 
- @IncludeTags 
- @ExcludeTags

要执行套件，您需要使用@Suite注释，并在项目依赖项中包含 `junit-platform-suite` 模块。

> Read More: [Suite Samples](https://github.com/hm0223/sample-repo/blob/main/junit5-samples/src/test/java/com/hm/junit5/samples/biz/JUnit5SuiteTest.java)
```java
package com.hm.junit5.samples.biz;

import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectPackages("com.hm.junit5.samples.biz")
public class JUnit5SuiteTest {
   //...
}
```

## 6. JUnit 5 Assertions

断言有助于用测试的实际输出验证预期输出。

为了简单起见，所有JUnit Jupiter断言都是 `org.junit.jupiter.Assertions` 类中的静态方法，例如assertEquals()， assertNotEquals()。

```java
class Junit5AssertionsTest {
    @Test
    void testCase() {
        // Test will pass
        Assertions.assertNotEquals(3, 1 + 1);

        // Test will fail
        Assertions.assertNotEquals(4, 2 + 2, "Calculator.add(2, 2) test failed");

        // Test will fail
        Supplier<String> messageSupplier = () -> "Calculator.add(2, 2) test failed";
        Assertions.assertNotEquals(4, 2 + 2, messageSupplier);
    }

}
```

> Read More: [JUnit 5 Assertions](todo)


## 7. JUnit 5 Assumptions
Assumptions提供静态方法来支持基于假设的条件测试执行。假设失败将导致测试中止。
当继续执行给定的测试方法没有意义时，通常使用假设。在测试报告中，这些测试将被标记为通过。

假设类有三个这样的方法:assumeFalse()、assumeTrue()和assuingthat ()

```java
public class AppTest {
    @Test
    void testOnDev()
    {
        System.setProperty("ENV", "DEV");
        Assumptions.assumeTrue("DEV".equals(System.getProperty("ENV")), AppTest::message);
    }

    @Test
    void testOnProd()
    {
        System.setProperty("ENV", "PROD");
        Assumptions.assumeFalse("DEV".equals(System.getProperty("ENV")));
    }

    private static String message () {
        return "TEST Execution Failed :: ";
    }
}
```

Assertions和Assumptions都是JUnit5框架中的注解，用于辅助进行单元测试。

Assertions是断言类，提供了一系列的静态方法，如assertTrue。当这些方法的参数为false时，会抛出AssertionFailedError异常，JUnit将抛出此异常的方法判定为失败。例如，你可以使用它来检查代码的输出是否符合预期。

而Assumptions则是假设类，它的主要作用在于在测试方法运行之前，先设定一些程序运行的假设条件，只有当这些假设条件都满足时，测试方法才会被执行。例如，如果你的代码依赖于某些特定的环境变量或配置文件，你就可以使用Assumptions来确保这些前提条件的存在。

> Read More: [JUnit 5 Assumptions](todo)


## 8. Backward Compatibility for JUnit 4
由于所有特定于JUnit Jupiter的类和注释都位于org.junit.jupiter基包之下，因此在类路径中同时拥有JUnit 4和JUnit Jupiter不会导致任何冲突。因此，建议在Junit 5基础结构上编写新的测试。

JUnit 4已经存在很长时间了，并且有很多用JUnit 4编写的测试。JUnit木星也需要支持这些测试。为此目的，开发了JUnit Vintage子项目。

JUnit Vintage为在JUnit 5平台上运行基于JUnit 3和JUnit 4的测试提供了一个TestEngine实现。只要我们在类路径中有JUnit -vintage-engine构件，JUnit 3和JUnit 4测试就会被JUnit平台启动器自动拾取。

```xml
<dependencies>
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.12</version>
		<scope>test</scope>
	</dependency>
	<dependency>
		<groupId>org.junit.vintage</groupId>
		<artifactId>junit-vintage-engine</artifactId>
		<version>5.10.0</version>
		<scope>test</scope>
	</dependency>
</dependencies>
```
在添加了这些依赖项之后，我们可以很容易地在Junit 5环境中运行Junit 4测试。

请注意，如果项目具有本文开头所讨论的所需的JUnit 5依赖项，则可以在相同的代码库中使用JUnit 5编写新的测试。
```xml
<dependencies>
	<dependency>
		<groupId>org.junit.jupiter</groupId>
		<artifactId>junit-jupiter-api</artifactId>
		<version>5.10.0</version>
		<scope>test</scope>
	</dependency>
		<dependency>
		<groupId>org.junit.jupiter</groupId>
		<artifactId>junit-jupiter-engine</artifactId>
		<version>5.10.0</version>
		<scope>test</scope>
	</dependency>
	<!-- JUnit 4 Vintage and JUnit 4 dependencies as well-->
</dependencies>
```

## 9. Migration from JUnit 4 to JUnit 5
虽然JUnit 5提供了对JUnit 4注解的支持，但建议迁移到新的注释，以充分利用JUnit 5的特性。

官方的JUnit 5参考有一个我们需要进行健壮迁移的更改列表。它在JUnit Vintage测试引擎的帮助下提供了一条迁移路径。主要变化如下:

| 步骤                          | 注意                                                   |
|-----------------------------|------------------------------------------------------|
| 更新依赖                        | JUnit 4需要一个依赖项，而JUnit 5需要基于模块使用的多个依赖项。               |
| 替换注解                        | JUnit 5具有与JUnit 4不同的包结构，因此即使注释名称相同，我们仍然需要更改import语句。 |
| 替换 assertions 和 assumptions | JUnit 5为断言和假设语句提供了单独的类和包。我们需要使用新的类。                  |
| 替换JUnit 4规则和运行程序            | 这需要更谨慎的改变。我们需要了解JUnit 5的升级，并在每个类中逐一进行这些更改。           |

如果您有遗留代码或严重依赖JUnit 4的外部依赖项，则可能需要考虑更渐进的迁移策略。您可以从同时运行JUnit 4和JUnit 5测试开始，直到您对完全迁移有信心为止。


## 10. Conclusion
JUnit 5感觉如此令人兴奋和功能丰富。现在，它对第三方工具和api的扩展是开放的。作为一名测试作者，您可能不会觉得有太大的不同，但是当您使用它的扩展或尝试开发IDE插件时，您会称赞它。

您还可以考虑将测试模板添加到 IDE中，以提高开发人员的开发速度。

Happy Learning !!!