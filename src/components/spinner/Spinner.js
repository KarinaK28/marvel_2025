const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block'}} width="177px" height="177px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path d="M32 50A18 18 0 0 0 68 50A18 20.2 0 0 1 32 50" fill="#da5047" stroke="none">
            <animateTransform attributeName="transform" type="rotate" dur="0.5586592178770949s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.1;360 50 51.1"></animateTransform>
            </path>
        </svg>
    )
}
 
export default Spinner;