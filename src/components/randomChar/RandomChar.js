import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        
        console.log('constructor');
    }
    state = {
        char: {},
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();
    
    componentDidMount() {
        this.updateChar();
      // this.timerId = setInterval(this.updateChar, 3000);
        console.log('mount');
    }
    
    componentWillUnmount() {
        //  clearInterval(this.timerId);
        console.log('unmount');
    }
    
    onCharLoaded = (char) => {
        console.log('charloaded,update');
        this.setState({
            char, 
            loading: false
        })
    }
    
    onCharLoading = () => {
        this.setState ({
            loading: true
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    updateChar = () => {
        console.log('updatechar;in didMount');
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        this.onCharLoading()
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    render() {
        console.log('render1');
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        console.log('render2');
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                            onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    console.log('render3');
    const {name, description, thumbnail, homepage, wiki} = char;
    console.log('render4');
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;