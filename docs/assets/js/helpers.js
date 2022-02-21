const
randArr = (arr) => arr[Math.floor(Math.random() * arr.length)],
randomMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
capitalize = (s) => s ? `${s[0].toUpperCase()}${s.substring(1)}` : s;
