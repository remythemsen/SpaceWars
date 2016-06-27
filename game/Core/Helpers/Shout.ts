module SpaceWars.Core.Helpers {
/*

 This is a simple logger class, it's sole purpose is
 to log custom information to various log types.

 */
    export class Shout {

        /*

         ToConsole writes information to the Console.

         */
        public static ToConsole(message: string, className?:string) : void {

            var output = Array<string>();
            var seperator = ' : ';

            // Appending timestamp if specified in param.

            output.push(new Date().toLocaleTimeString());

            // Appending Custom Message
            output.push(message);

            // Appending Class name if provided
            if(className !== null) output.push(className);

            // Outputting to console.
            console.log(output.join(seperator));

        }
    }
}
