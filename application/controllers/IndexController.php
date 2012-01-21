<?php

class Shifts extends Zend_Db_Table_Abstract
{
    protected $_name = 'shifts';
}

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
    	$options = array(
			'host'     => getDbHost(),
			'username' => getDbUser(),
			'password' => getDbPassword(),
			'dbname'   => getDbName()
		);
    	$db = Zend_Db::factory('PDO_MYSQL', $options);
		$table = new Shifts(array('db' => $db));
		$select = $table->select();
		var_dump($select);
		die(1);		
    }
}

/**
 * @return string the container db host
 */
function getDbHost() {
	return get_cfg_var('zend_developer_cloud.db.host');
}

/**
 * @return string the container db name
 */
function getDbName() {
	return get_cfg_var('zend_developer_cloud.db.name');
}

/**
 * @return string the container db user
 */
function getDbUser() {
	return get_cfg_var('zend_developer_cloud.db.username');
}

/**
 * @return string the container db password
 */
function getDbPassword() {
	return get_cfg_var('zend_developer_cloud.db.password');
}
