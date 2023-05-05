import logo from '../assets/assets/logo.svg';


const Hero = () => {
    return (
        <header className='w-full flex justify-center 
        items-center flex-col'>
            <nav className='flex justify-between
            items-center w-full mb-10 pt-3'>
                <img src={logo} alt='CondesAI_Logo'
                    className='w-28 object-contain' />
                <button
                    type='button'
                    onClick={() => window.open('https://github.com/garyzhuo')}
                    className='black_btn'
                >
                    GitHub
                </button>
            </nav>
            <h1 className='head_text'>
                Summarize Articles with <br className='max-md:hidden' />
                <span className='orange_gradient'>OpenAI GPT -4</span>
            </h1>
            <h2 className='desc'>

                Experience effortless reading with CondensAI,
                an article summarizer that elegantly distills lengthy
                articles into crisp and coherent summaries.
            </h2>
        </header>

    )
}

export default Hero