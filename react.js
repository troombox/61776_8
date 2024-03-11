
        // Image component
        function Image({ thumbnail, onClick }) {
            return <img src={thumbnail} className="thumbnail" onClick={onClick} />;
        }

        // App component
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    images: [],
                    selectedImage: null
                };
            }

            componentDidMount() {
                const limit = 20;
                axios.get('https://picsum.photos/v2/list?limit=' + limit)
                    .then(response => {
                        const images = response.data.map(item => ({
                            thumbnail: `https://picsum.photos/150/150?image=${item.id}`,
                            full: `https://picsum.photos/${item.width}/${item.height}?image=${item.id}`
                        }));
                        this.setState({ images });
                    })
                    .catch(error => {
                        console.error('Error fetching images:', error);
                    });
            }

            selectImage(imageUrl) {
                this.setState({ selectedImage: imageUrl });
            }

            render() {
                const { images, selectedImage } = this.state;
                return (
                    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
                        <h1 className="text-2xl mb-4">Images</h1>
                        <div className="grid grid-cols-5 gap-5 justify-items-center">
                            {images.map((image, index) => (
                                <Image key={index} thumbnail={image.thumbnail} onClick={() => this.selectImage(image.full)} />
                            ))}
                        </div>
                        {selectedImage && (
                            <div className="mt-8">
                                <h2 className="text-xl mb-4">Selected Image</h2>
                                <img src={selectedImage} className="selected-image" />
                            </div>
                        )}
                    </div>
                );
            }
        }

        // Render the App component
        ReactDOM.render(<App />, document.getElementById('root'));
