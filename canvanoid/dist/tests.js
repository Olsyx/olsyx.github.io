"use strict";

function circleOnLine_Collision_Test() {

               var line = { A: { x: 100, y: 100 },
                              B: { x: 200, y: 100 } };

               var circle = { x: 5,
                              y: 5,
                              radius: 5 };

               console.log(circleOnLine_Collision(circle, line));

               circle.x = 150;
               circle.y = 90;
               circle.radius = 10;
               console.log(circleOnLine_Collision(circle, line));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0cy5qcyJdLCJuYW1lcyI6WyJjaXJjbGVPbkxpbmVfQ29sbGlzaW9uX1Rlc3QiLCJsaW5lIiwiQSIsIngiLCJ5IiwiQiIsImNpcmNsZSIsInJhZGl1cyIsImNvbnNvbGUiLCJsb2ciLCJjaXJjbGVPbkxpbmVfQ29sbGlzaW9uIl0sIm1hcHBpbmdzIjoiOztBQUNBLFNBQVNBLDJCQUFULEdBQXVDOztBQUVuQyxtQkFBSUMsT0FBTyxFQUFFQyxHQUFHLEVBQUNDLEdBQUcsR0FBSixFQUFTQyxHQUFHLEdBQVosRUFBTDtBQUNFQyxpQ0FBRyxFQUFDRixHQUFHLEdBQUosRUFBU0MsR0FBRyxHQUFaLEVBREwsRUFBWDs7QUFHQSxtQkFBSUUsU0FBUyxFQUFFSCxHQUFHLENBQUw7QUFDRUMsaUNBQUcsQ0FETDtBQUVFRyxzQ0FBUSxDQUZWLEVBQWI7O0FBSUFDLHVCQUFRQyxHQUFSLENBQVlDLHVCQUF3QkosTUFBeEIsRUFBZ0NMLElBQWhDLENBQVo7O0FBR0FLLHNCQUFPSCxDQUFQLEdBQVcsR0FBWDtBQUNBRyxzQkFBT0YsQ0FBUCxHQUFXLEVBQVg7QUFDQUUsc0JBQU9DLE1BQVAsR0FBZ0IsRUFBaEI7QUFDQUMsdUJBQVFDLEdBQVIsQ0FBWUMsdUJBQXdCSixNQUF4QixFQUFnQ0wsSUFBaEMsQ0FBWjtBQUtIIiwiZmlsZSI6InRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBjaXJjbGVPbkxpbmVfQ29sbGlzaW9uX1Rlc3QoKSB7XG5cbiAgICB2YXIgbGluZSA9IHsgQToge3g6IDEwMCwgeTogMTAwfSxcbiAgICAgICAgICAgICAgICAgQjoge3g6IDIwMCwgeTogMTAwfSB9O1xuXG4gICAgdmFyIGNpcmNsZSA9IHsgeDogNSxcbiAgICAgICAgICAgICAgICAgICB5OiA1LFxuICAgICAgICAgICAgICAgICAgIHJhZGl1czogNSB9O1xuXG4gICAgY29uc29sZS5sb2coY2lyY2xlT25MaW5lX0NvbGxpc2lvbiggY2lyY2xlLCBsaW5lICkpOyBcblxuXG4gICAgY2lyY2xlLnggPSAxNTA7XG4gICAgY2lyY2xlLnkgPSA5MDtcbiAgICBjaXJjbGUucmFkaXVzID0gMTA7XG4gICAgY29uc29sZS5sb2coY2lyY2xlT25MaW5lX0NvbGxpc2lvbiggY2lyY2xlLCBsaW5lICkpO1xuXG5cblxuXG59Il19