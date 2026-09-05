import tw from '@/lib/tailwind'
import SkeetLogoHorizontal from '@assets/logo/SkeetLogoHorizontal.svg'
import SkeetLogoHorizontalInvert from '@assets/logo/SkeetLogoHorizontalInvert.svg'
import clsx from 'clsx'

type Props = {
  className?: string
}

export default function LogoHorizontal({ className }: Props) {
  return (
    <>
      <SkeetLogoHorizontal
        style={tw`${clsx('h-8 md:h-10 dark:hidden', className)}`}
      />
      <SkeetLogoHorizontalInvert
        style={tw`${clsx('hidden h-8 md:h-10 dark:flex', className)}`}
      />
    </>
  )
}
