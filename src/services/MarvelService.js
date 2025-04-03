

class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    _baseOffset = 0
    getResource = async (url) => {
          console.log('MS,getResource');
         let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    
    getAllCharacters = async (offset = this._baseOffset ) => {
        console.log('MS,getAllCharacters');
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        console.log(res);
        return res.data.results.map(this._transformCharacter);
    }
    
    
    ///////////////////////////////////////////
    // getCharacter_old = async (id) => {
    //     const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    //     return this._transformCharacter(res);
    // }
    // _transformCharacter_old = (res) => {
      
    //     return {
    //         name: res.data.results[0].name,
    //         description: res.data.results[0].description ? `${res.data.results[0].description.slice(0, 210)}...` : 'There is no description for this character',
    //         thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
    //         homepage: res.data.results[0].urls[0].url,
    //         wiki: res.data.results[0].urls[1].url
    //     }
    // }

//////////////////////////////////////////
    getCharacter = async (id) => {
    console.log('MS,getCharacter');
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        console.log('MS,_transformCharacter');
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    /////////////////////////////////
}

export default MarvelService;