**v.0** - not complete.

# B+ Tree implemented in TypeScript 

[Implementation](b-plus-src/) \
[Implementation description](b-plus-src/README.md)

[Compiled JavaScript files](js-build/)

<hr>

### Working on sequential data

This B+ tree is optimized for use with sequential data. That mainly is added on the far right side of the tree.

### How to use:
You have to implement two interfaces. One represents the key, [IKey](b-plus-src/ikey.ts). The other is the data block that stores the data and represents the leaf in the tree, [IDataBlock](b-plus-src/idatablock.ts).

To make a tree, you create an instance of the [BPlus](b-plus-src/b-plus.ts) class. The constructor there takes three arguments.
| Arguments | Description |
|-----------|-------------|
| orderOfTheTree | Number of children there can be per node. |
| numChildAfterSplit |  |
| minNumChildBeforeUnderflow |  |