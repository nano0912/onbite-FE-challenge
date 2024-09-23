export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div>Global Layout</div>
        {children}
      </body>
    </html>
  );
}
