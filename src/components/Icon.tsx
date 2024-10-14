import Icomoon from "react-native-icomoon"
import type { IconMoonProps } from 'react-native-icomoon'
import json from '../assets/selection.json'

type IconProps = Omit<IconMoonProps, "iconSet">

export default function Icon({ name, ...restProps }: IconProps) {
    return <Icomoon iconSet={json} name={name} {...restProps} />
}