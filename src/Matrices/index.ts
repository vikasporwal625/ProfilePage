import { Dimensions as DM } from 'react-native'
const { width, height, fontScale } = DM.get("screen")
export const Dimentions = {
    PADDING: 20,
    MARGIN: 20,
    screenWidth: width,
    screenHeight: height
}