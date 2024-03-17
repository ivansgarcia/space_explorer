import * as React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => {
    return (
        <main className="min-h-screen bg-black p-8 font-open-sans text-white">
            <h1 className="text-3xl text-blue-600">Page not found</h1>
            <p className="m-8 text-lg">
                Sorry 😔, we couldn’t find what you were looking for.
                <br />
                {process.env.NODE_ENV === 'development' ? (
                    <>
                        <br />
                        Try creating a page in <code>src/pages/</code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link
                    className="rounded bg-blue-gray-600 px-4 py-2 hover:bg-blue-gray-700"
                    to="/"
                >
                    Go home
                </Link>
            </p>
        </main>
    );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
