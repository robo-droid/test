var express = require('express');
var router = express.Router();
var connection=require('./../config');
var page=1;
/* GET home page. */
router.get('/home'+page, function(req, res, next) {

  if(connection) {

    connection.query("SELECT * FROM post_listing", function (error, results, fields) {
      var endpage=0;
      var startpage=0;
      if(results.length>=10)
      {
           endpage=9;
           startpage=0;
      }
      else
      {
          endpage=results.length;
          startpage=0;
      }
      ///rendering index with object params
      var extras = {
        start_pageno: startpage,
        end_pageno: endpage
      };
      res.render('index',{posts:results,extras:extras});
    });
  }
  else
  {
    res.json({
      success:0,
      msg:'Server error,please try again'
    })
  }

});

router.get('/home:page',function (req,res,next) {
        var page = parseInt(req.params.page);


  if(connection) {

    connection.query("SELECT * FROM post_listing", function (error, results, fields) {

          var endpage=0;
          var startpage=0;
          var paages=parseInt(results.length/10);
          if (page==paages)
          {

            if((parseInt(results.length))%10!=0)
            {
               endpage=parseInt(((page*10)-1)+((results.length)%10));
               startpage=((page*10)-1)-9;
            }
            else
            {
               endpage=(page*10)-1;
               startpage=endpage-9;
            }
          }
          else
          {
              endpage=(page*10)-1;
              startpage=endpage-9;
          }

          // var endpage=(page*10)-1;
          // var startpage=endpage-9;
          // // console.log(endpage+startpage);

          var extras = {
            start_pageno: startpage,
            end_pageno: endpage
          };
          res.render('index',{posts:results,extras:extras});

    });
  }
  else
  {
    res.json({
      success:0,
      msg:'Server error,please try again'
    })
  }

});
module.exports = router;
