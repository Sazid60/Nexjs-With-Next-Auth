import Link from 'next/link';
import React from 'react';

const AboutContent = () => {
    return (
        <div>
            <h1>About Contents Page</h1> <br />
            <div className='flex flex-col space-y-5 mb-9'>
                <Link href={'/about/history'}>History</Link>
                <Link href={'/about/mission'}>Mission</Link>
            </div>
        </div>
    );
};

export default AboutContent;