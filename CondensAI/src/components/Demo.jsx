import React from 'react'
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets/assets';

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });

    const handleSubmit = async (e) => {
        alert("Submitted")
    }

    return (
        <section className='mt-16 w-full max-w-xl'>
            {/* add search here maybe? */}
            <div className='flex flex-col- w-full gap-2'>
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}
                >

                    <img
                        src={linkIcon}
                        alt="icons"
                        className='absolute left-0 my-2 ml-3 w-5'
                    />

                    {/* reminder to self to change styling */}

                    <input
                        type='url'
                        placeholder='Enter a URL'
                        value={article.url}
                        onChange={(e) => setArticle({
                            ...article,
                            url: e.target.value
                        })}
                        required
                        className='url_input peer'
                    />
                    <button
                        type='submit'
                        className='submit_btn
                        peer-focus:border-gray-700
                        peer-focus-text-gray-700'
                    >
                        ↵
                    </button>
                </form>

                {/* Add URL or browser history here maybe? */}
            </div>
            {/* Add display results here maybe? */}
        </section>
    )
}

export default Demo