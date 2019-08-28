var express = require('express');
var router = express.Router();
var connection=require('./../config');
/* GET home page. */
router.get('/read_details:id', function(req, res, next) {
    var post_id=req.params.id;
    if(connection) {
        var post_listObj;
        var post_stepsObj;
        var total_postlistObj;
        connection.query("SELECT * FROM post_listing WHERE post_id=?",[post_id], function (error, results, fields) {
                post_listObj=results[0];
                total_postlistObj=results;
        connection.query("SELECT * FROM steps WHERE post_id=?",[post_id], function (error, results, fields) {
                post_stepsObj=results;
            });
        connection.query("SELECT * FROM post_listing", function (error, results, fields) {
                total_postlistObj=results;
                res.render('single_post',{steps_details:post_stepsObj,post_details:post_listObj,total_posts:total_postlistObj,current_post_id:post_id});
                //res.send(total_postlistObj);
                //console.log(post_listObj);
                //console.log(post_stepsObj.size);
                //res.render('single_post',{steps_details:post_stepsObj,post_details:post_listObj,total_posts:total_postlistObj});
            });
                //res.render('single_post',{post_details:post_listObj,steps_details:post_stepsObj});

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
