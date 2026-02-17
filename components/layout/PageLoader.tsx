const PageLoader = () => {
    return (
        <div className='flex items-center justify-center'>
            <div id="loader">
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow floodColor="#000" stdDeviation="1.5" dy={0} dx={0}/>
                        </filter>
                    </defs>
                    <circle
                        r={45}
                        cy={50}
                        cx={50}
                        style={{
                            fill: "transparent",
                            stroke: "#064266",
                            strokeWidth: 7,
                            strokeLinecap: "round",
                            filter: "url(#shadow)"
                        }}
                        id="spinner"
                    />
                </svg>
            </div>
        </div>
    );
};

export default PageLoader;