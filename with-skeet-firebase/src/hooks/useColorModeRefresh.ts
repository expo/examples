import { useRecoilValue } from 'recoil'
import { colorModeRefreshState } from '@/store/colorModeRefresh'

export default function useColorModeRefresh() {
  const _refresh = useRecoilValue(colorModeRefreshState)
}
