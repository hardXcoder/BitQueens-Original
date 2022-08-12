import React from "react";

export default class About extends React.Component {
    state = {
        loading: true,
        person: null
    };

    async componentDidMount() {

    }

    render() {

        return (
            <div className="mainHomeBlock">


                <h3 className="headingMargin">Our Inspiration</h3>

                <p className="paraMargin">
                Strength is often characterized by an ability to withstand pain and
                 we all have witnessed how much strength it takes of a woman to bear
                  a child. That is the reason why true architect of society is named
                   as women. It is her courage that makes up this beautiful world. 
                   </p>
                       <p className="paraMargin">
Every day, their bravery, which resides in perfect harmony with incredible tenderness, 
amazes us.
</p>
<p className="paraMargin">
To celebrate each woman on earth we have brought to you 10,000 powerful unique
 artworks which are entirely different to each other. They have varying dresses,
  accessories, jewelry, zodiac sign, hair type & color, skin color and innovative
   backgrounds inspired by creative thoughts of woman.
</p>
<p className="paraMargin">
It is the eyes which is the entrance to the woman’s heart (where the love resides),
 hence we have same captivating eyes for each of the artwork. So, have a look at our 
 gallery and get lost in someone’s eyes.
</p>


<h3 className="headingMargin">Uniqueness of characters</h3>
                <p className="paraMargin">
                   There are a total of 10000 different unique Queens's character which
                   differ from each other in various attributes. No two characters are
                   same and each Queen depicts a story about itself. The character 
                   demonstrates the women from different geographical areas, different 
                   skin colors, and different hair-styles and ornaments worn by women.
                   
                </p>
                
            </div>
        );
    }
}