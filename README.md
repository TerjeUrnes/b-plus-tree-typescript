**v.0** - not complete.

# B+ Tree implemented in TypeScript 

[Implementation](b-plus-src/) \
[Implementation description](b-plus-src/README.md)

[Compiled JavaScript files](js-build/)

<hr>

### Working on sequential data

This B+ tree has been tuned for sequential data. That mainly is added on the far right side of the tree. 

### How to use:

You have to implement two interfaces. One represents the key, [IKey](b-plus-src/ikey.ts). The other is the data block that stores the data and represents the leaf in the tree, [IDataBlock](b-plus-src/idatablock.ts).

To make a tree, you create an instance of the [BPlus](b-plus-src/b-plus.ts) class. The constructor there takes three arguments.

| Arguments | Description |
|-----------|-------------|
| orderOfTheTree | Number of children there can be per node. |
| numChildAfterSplit | Number of children left in the node after splitting (usually n/2) |
| minNumChildBeforeUnderflow | Minimum number of children in the node after a remove. Less will activate a merge (usually n/2) |

| Properties | Description |
|------------|-------------|
| Count | |

| Methods | Arguments | Description |
|---------|-----------|-------------|
| Add | dataBlock | |
| Remove | key | |
| Get | key | |
| GetRange | fromKey, toKey, toEndPoint | |
| GetFirst | key | Returns the match or the first that follows if no match |
