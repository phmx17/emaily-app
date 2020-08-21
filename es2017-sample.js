// const json = require ("express").json
const { json } = require('express');    // way cooler
// install fetch first with npm; more info: https://github.com/node-fetch/node-fetch#installation
const fetch = require('node-fetch');

// run in Chrome console
// const fetchAlbums = () => {
//     fetch('https://rallycoding.herokuapp.com/api/music_albums')
//      .then(res => res.json())    
//      .then(res => res.json())    
//      .then(json => console.log(json))
// };

// ES 2017; easier to understand
// with imports above this will also work with node.
const fetchAlbums = async() => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()   // since res.json also returns a promise, await required
    console.log(json);
}
fetchAlbums();

