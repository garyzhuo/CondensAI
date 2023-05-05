import React from 'react'
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets/assets';
import { useLazyGetSummaryQuery } from '../services/article';



const Demo = () => {
    // this is the main component that handles the state and the logic of the app
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    // this is the state that holds all the articles that the user has searched for
    const [allArticles, setAllArticles] = useState([]);
    // this is the state that holds the url that the user has copied
    const [copied, setCopied] = useState("");

    // RTK lazy query
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    // Load data from localStorage on mount
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            // JSON.parse() converts a string to an object
            localStorage.getItem("articles")
        );
        // localStorage.getItem() gets the data from the localStorage
        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    // Save data to localStorage on change
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if the article is already in the state
        const existingArticle = allArticles.find(
            (item) => item.url === article.url
        );
        // find() returns the value of the first element in the provided array that satisfies the provided testing function
        if (existingArticle) return setArticle(existingArticle);

        // fetch the summary
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            // update state and local storage
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
    };

    // copy the url and toggle the icon for user feedback
    const handleCopy = (copyUrl) => {
        // navigator.clipboard.writeText() copies the text to the clipboard
        setCopied(copyUrl);
        // setCopied() sets the state of the copied url
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    };

    // handles the enter key press
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    // this is the main component that handles the state and the logic of the app
    return (
        // the search bar and the history of the articles
        <section className='mt-16 w-full max-w-xl'>
            {/* Search */}
            <div className='flex flex-col w-full gap-2'>
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt='link-icon'
                        className='absolute left-0 my-2 ml-3 w-5'
                    />

                    {/* the input field for the user to paste the article link */}
                    <input
                        type='url'
                        placeholder='Paste the article link'
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        onKeyDown={handleKeyDown}
                        required
                        className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
                    />
                    {/* this will be the submit button  */}
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
                    >
                        <p>↵</p>
                    </button>
                </form>

                {/* Browse History */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.reverse().map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className='link_card'
                        >
                            <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                    className='w-[40%] h-[40%] object-contain'
                                />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Result */}
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                    <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
                ) : error ? (
                    <p className='font-inter font-bold text-black text-center'>
                        Well, that wasn't supposed to happen...
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                Article <span className='blue_gradient'>Summary</span>
                            </h2>
                            <div className='summary_box'>
                                <p className='font-inter font-medium text-sm text-gray-700'>
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};



export default Demo;