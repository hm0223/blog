# Vim基础

## Vim概述

纯命令模式好用的编辑器

## 编辑模式

edit 模式

进入： 按下i，出现INSERT字样，进入编辑模式。

退出：按下Esc  加上 :(冒号)   w(保存)  q(退出)     q!(不保存的情况下退出)

### 配置vim

vim的配置文件: `.vimrc`

```vim
syntax on  # 开启语法高亮
set number # 显示行号 
```

可以在Google上搜索相关配置：

- Google 输入 vimrc github 即可找到 vimrc

- 比如将以下内容复制到你的 ~/.vimrc文件中：

  https://raw.githubusercontent.com/amix/vimrc/master/vimrcs/basic.vim



## 命令模式

### 移动操作

- 按照方向键移动： H（左）	 J（下）	K（上）	L（右）或者 键盘上的方向键

- 按照单词移动：W（word，下一个单词）  B（上一个单词）

- 按照翻页移动：Control + F(下页) / Control + B(上页)   或者 PageUp(上页) / PageDown(下页)

- 按照行直接定位：行号 + GG，直接跳转到指定的行号,   GG可以直接跳到首行, Shift + G跳到尾行

- 按照方向和行数移动：10J(向下移动10行)  10K(向上移动10行)

- 按照内容查找：/要查找的内容 匹配到的内容会高亮显示，按回车 ，N(next)下一个 /Shift N上一个



### 删除操作

- 剪切：CC  （并会进入到编辑模式） 恢复 U（undo）

连续剪切n行，CnC,连续剪切两行 C2C

- 粘贴：P

- 按V键进入 Visual模式(按下键操作整个区块)：按C剪切，可以直接剪切

- 复制：YY

- 自动补全：Controler + N（只针对出现过的单词）



## Vim插件

### 插件管理

Vim plug

```
搜索 vim plug # 第三方插件管理系统
```

管理vim的插件：[vim-plug](https://github.com/junegunn/vim-plug)

Unix:

```sh
# 命令行安装
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

或者：

```sh
# 进入该页面将内容拷贝到 ~/.vim/autoload/plug.vim 中
https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```



### 结合Vim Plug使用插件

Usage

Add a vim-plug section to your `~/.vimrc` (or `stdpath('config') . '/init.vim'` for Neovim)

1. Begin the section with `call plug#begin()`

2. List the plugins with `Plug` commands

3. ```
   call plug#end()
   ```

   to update

   ```
   &runtimepath
   ```

   and initialize plugin system

   - Automatically executes `filetype plugin indent on` and `syntax enable`. You can revert the settings after the call. e.g. `filetype indent off`, `syntax off`, etc.

NERDTree:  [NERDTree:](https://vimawesome.com/plugin/nerdtree-red)

![image-20200504130017246](/v-blog/img/linux/vim/image-20200504130017246.png)

```
call plug#begin()
Plugin 'scrooloose/nerdtree' # 指定插件,以nerdtree为例
call plug#end()
:PluginInstall # 安装插件
```

也可参照插件网址：[Vimawesome](https://vimawesome.com/)



### 卸载插件

Clean

- 注释("双引号可以注释)或者删除 `~/.vimrc`中的插件相关配置信息
- 命令模式使用命令` :PlugClean`



