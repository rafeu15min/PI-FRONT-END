export default function Link({ children, href }: any) {
    return (
        <a href={href} style={ { textDecoration: 'none', color: 'inherit'}}>{children}</a>
    )
}