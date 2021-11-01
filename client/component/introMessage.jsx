import React from 'react'
import Typewriter from 'typewriter-effect'

const developer = `
    <pre class='typewriter'>
        <span class="const-highlight">const</span> developer = {
            name: <span class="string-highlight">'doctorrWeb'</span>,
            title: <span class="string-highlight">'Developer FullStack JS'</span>,
            location: <span class="string-highlight">'Zurich (Switzerland)'</span>,
            yearsOfExperience: <span class="string-highlight">10</span>,
            languages:[
                <span class="string-highlight">'French'</span>,
                <span class="string-highlight">'English'</span>
            ]
        }
    </pre>
`

const stack = `
    <pre class='typewriter'>
        <span class="const-highlight">const</span> stack = {
            technos:[
                <span class="string-highlight">...MERN_Stack</span>,
                <span class="string-highlight">'GraphQL'</span>,
                <span class="string-highlight">'SQL'</span>
            ],
            otherSkillz:[
                <span class="string-highlight">'graphicDesign'</span>,
                <span class="string-highlight">'UX/UI design'</span>,
                <span class="string-highlight">...someOthers</span>
            ]
        }
    </pre>
`

const devFunc = `
    <pre class='typewriter'>
        <span class="const-highlight">const</span> newDev = <span class="const-highlight">new</span> <span class="func-highlight">Developer</span>({
            <span class="string-highlight">...developer</span>,
            <span class="string-highlight">...stack</span>
        })

        <span class="func-highlight">Developer</span>.save()
    </pre>
`

const IntroMessage = () => {
    return (
        <Typewriter
            options={{
                strings: [developer, stack, devFunc],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 'natural'
            }}
        />
    )
}

export default IntroMessage