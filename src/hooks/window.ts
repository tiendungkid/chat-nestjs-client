import {useState, useEffect} from 'react'

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<{
		width?: number;
		height?: number;
	}>({})
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			})
		}

		window.addEventListener('resize', handleResize)
		handleResize()
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return windowSize
}

export {useWindowSize}
