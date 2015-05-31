# between2 [![Build Status](https://travis-ci.org/Dashed/between2.svg)](https://travis-ci.org/Dashed/between2)

> `between2` is fork of [`between`](https://github.com/dominictarr/between)

## Usage

```
$ npm install --save between2
```

## API

### `between(a, b)`

``` js
const between  = require('between');
const tween = between('a', 'b');

//tween is a string that will sort between 'a' and 'b'.
```

`a` and `b` can be any string that does not end in the lowest character.
this is like how there is only one number between 0 and 1 that ends in a "0".

**NOTE:** By default, the following characters are used to generate the string:

```
!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~
```

### `after(a)`

Generate string that sorts between `a` and `between.hi`.

### `before(a)`

Generate string that sorts between `between.lo` and `a`.

### `trim(a)`

Trim `between.lo` characters to the right of `a`.

### `strord(a, b)`

Compares two strings, `a` and `b`, lexicographically. Returns `0` if `a == b`; `-1` if `a` is lexicographically less than `b`; `1` if `a` is lexicographically greater than `b`.

### `randstr(len)`

Generate random string with length `len` using `chars`. Expects `len >= 0`.

**NOTE:** The string's last character will never be either the `between.lo` character or the `between.hi` character for `chars` of size greater than two. This is intended so that this string, `a`, may be used as a reference point to generate strings that will be able to sort between `a` and any other string distinct from `a`. For `chars` of size 2, the `between.hi` character will be used.

### `inject(chars)`

Create instance of `between` using characters from `chars`.

**NOTE:** It's expected that `chars` is at least 2 distinct characters long.

### `between.lo` and `between.hi`

the top most string possible, and the lowest string possible. You must not be used
as positions for items, because it will not be possible to insert items after
or before them. These values represent the space infront of the first item, and
the space between the last item.


## License

MIT
