import { Box, Theme } from "@radix-ui/themes"
import '@radix-ui/themes/styles.css';
import "src/ui/styles.css"

export const metadata = {
  title: 'YATC',
  description: 'yet another tuiter clone (but with emojis)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="appBackground" >
        <Theme appearance={'dark'}>
          <Box p={'5'}>
            {children}
          </Box>
        </Theme>
      </body>
    </html>
  )
}
