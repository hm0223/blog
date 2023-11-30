---
title: Java Introduction
date: 2023-11-29
tags:
- Java
- Java Base
author: huwenfeng
location: shanghai
---

Java is concurrent, object-oriented, and intended to let application developers “write once, run anywhere” (WORA). Java is considered a fast language, almost as fast as languages like C and Rust, but it uses a lot of memory in comparison to these languages.

1. What is Java Programming Language
   Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented, and specifically designed to have as few implementation dependencies as possible. It is intended to let application developers “write once, run anywhere” (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.

For example, we can write and compile a Java program on UNIX and run it on Microsoft Windows, Macintosh, or UNIX machines without any modifications to the source code.

WORA is achieved by compiling a Java program into an intermediate language called bytecode. The format of bytecode is platform-independent. A virtual machine, called the Java Virtual Machine (JVM), is used to run the bytecode on each platform.

2. History of Java
   Java was originally developed by James Gosling at Sun Microsystems (which has since been acquired by Oracle Corporation) and released in 1995 as a core component of Sun Microsystems’ Java platform. The language derives much of its syntax from C and C++, but it has fewer low-level facilities than either of them.

The Java programming language was designed to be a machine-independent programming language powerful enough to replace native executable code. Initially started with Applets (embedded components in a webpage), Java is today the most used platform for web-based applications and web services. Today, an offshoot of the Java platform is the basis for Google’s Android operating system which powers billions of phones and other mobile devices.

Oracle Corporation is the current owner of the official implementation of the Java SE platform, following their acquisition of Sun Microsystems on January 27, 2010. This implementation is based on the original implementation of Java by Sun. The Oracle implementation is available for Microsoft Windows, Mac OS X, Linux, and Solaris.

The Oracle implementation is packaged into two different distributions:

Java Runtime Environment (JRE) which contains the parts of the Java SE platform required to run Java programs and is intended for end users.
Java Development Kit (JDK) which is intended for software developers and includes development tools such as the Java compiler, Javadoc, Jar, and a debugger.
We can read about all the previous Java releases and their features in the linked post.

3. Java Virtual Machine
   At the core of Java ecosystem is the Java Virtual Machine (JVM). When we compile a Java program, Java source code is turned into simple binary instructions, much like ordinary microprocessor machine code. However, whereas C or C++ source is reduced to native instructions for a particular processor model, Java source is compiled into a universal format. These compiled instructions are called bytecode and are used by the virtual machine to run the code using Java runtime interpreter.

The runtime system performs all the normal activities of a hardware processor. It executes a stack-based instruction set and manages memory like an operating system in accordance with a strictly defined open specification to produce a Java-compliant virtual machine. For example, Java specifies the sizes and mathematical properties of all its primitive data types rather than leaving it up to the platform implementation.

In addition to compiling source code down to portable bytecode, Java further optimizes its performance by compiling bytecode to native machine code on the fly using JIT (Just-in-Time) compilation.

Java also supports Adaptive compilation. For example, HotSpot JVM starts out as a normal Java bytecode interpreter, but it also profiles what parts of the program are being executed repeatedly. Once it knows, HotSpot compiles those sections into optimal native machine code.

4. Automatic Memory Management
   Java uses an automatic garbage collector to manage memory in the object lifecycle. The programmer determines when objects are created, and the Java runtime is responsible for recovering the memory once objects are no longer used. Once no references to an object remain, the unreachable memory becomes eligible to be freed automatically by the garbage collector.

Something similar to a memory leak may still occur if a programmer’s code holds a reference to an object that is no longer needed, typically when objects that are no longer needed are stored in containers that are still in use. If methods for a nonexistent object are called, a “NullPointerException” is thrown.

Garbage collection may happen at any time. Ideally, it will occur when a program is idle. It is guaranteed to be triggered if there is insufficient free memory on the heap to allocate a new object; this can cause a program to stall momentarily. Explicit memory management is not possible in Java.

5. Hello World Program
   The traditional “Hello, world!” program can be written in Java as. Java source file must be named after the public class they contain, appending the suffix .java, for example, Application.java.

Application.java
```java
public class Application {

    public static void main(String[] args) {
        // Prints Hello World! to the console.
        System.out.println("Hello World!"); 	
    }
}
```

The source file must first be compiled into bytecode, using a Java compiler, producing a file named Application.class. Only then can it be executed, or ‘launched’.

```shell
$ javac Application.java
```

The entry point for any Java program is the main() method. To execute the main() method, use the java command with the class name.

```shell
$ java Application.class
```

The above program will execute the print statement, and the hello world message will be printed in the console.

6. Features of Java
   Java has multiple features. Some of these are unique to Java, and some of these are common among other languages.

Object Oriented – In Java, everything is represented as objects. An object is a kind of wrapper that encapsulates data and its associated behavior. Java supports all major object-oriented principles, as seen in other object-oriented languages.
Platform Independent – The programs written in Java are converted to bytecode by the Java compiler. This bytecode can be run on any machine having a Java runtime environment (JRE). It makes the Java applications platform independent. It differs from C or C++ applications, where programs are compiled into OS-specific binaries.
Secure – Java applications run in Java runtime environment (JRE) with almost no interaction with the system OS. It makes Java more secure than other languages.
Multithreaded – Java supports writing applications that can do multiple tasks in separate threads. All tasks progress using the time-slicing technique of OS threads. For example, a Java application serves as a user login form while running background processes.
High-performance – Java is an interpreted language, so it may never be as fast as a compiled language like C or C++. But, Java enables high performance with the use of a just-in-time compiler.
OS Architecture-neutral – Java compiler generates an OS architecture-neutral class file or bytecode. For example, in C programming, int data type occupies 2 bytes of memory for 32-bit architecture and 4 bytes of memory for 64-bit architecture. However, it occupies 4 bytes of memory for both 32 and 64-bit architectures in Java.

7. What’s Next?
   The [Java tutorial](../java.md) page lists down all the important topics you can go through to get a deeper understanding of the language basics and advanced concepts.

Happy Learning !!

