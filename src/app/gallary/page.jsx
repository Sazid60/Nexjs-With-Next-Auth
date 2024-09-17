import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <div>
            <h1>Gallary Page</h1>
            {
                [1, 2, 3].map((img) => (
                    <Image key={img} src={`/images/${img}.jpg`} alt="Banner" height="1080" width="1920" />
                ))
            }
            {/* <Image src="/images/BannerImage.png" alt="Banner" height="1080" width="1920" /> */}
        </div>
    );
};

export default page;