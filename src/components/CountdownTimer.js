// import React from 'react';

// class CountdownTimer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
     
//       buttonBorder: false,
//     };
   
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     console.log("handleclick entrei")
//     const { buttonBorder } = this.state;
//     this.setState({
//       buttonBorder: !buttonBorder,
//     });
//   }

//   componentDidMount() {
//     const miliseconds = 300;
//     let aux;
//     this.aux = setInterval(this.countdown, miliseconds);
//     console.log("o que é aux" + aux);
//     this.countdown(aux);
//   }

//   countdown(aux) {
//     const { timer30 } = this.state;
//     console.log("o que é aux depois" + aux);
//      if (timer30 > 0) {
//       this.setState((localtimer) => ({
//         timer30: localtimer.timer30 - 1,
//        }));
//     } 
//      else {
//        console.log(" o tempo acabou");
//        this.handleClick();
//       clearInterval(this.aux);
//      }
//   }

//   render() {
//     const { timer30 } = this.state;
//     return (
//       <div>
//         {timer30}
//       </div>
//     );
//   }
// }

// export default CountdownTimer;
