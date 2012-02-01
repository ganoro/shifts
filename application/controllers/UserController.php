<?php
require_once 'Db/Settings.php';

class Users extends Zend_Db_Table_Abstract {
	protected $_name = 'users';
}

class UserController extends Zend_Controller_Action
{
	protected $options;
	protected $db;
	
    public function init()
    {
    	// monitor
    	zend_monitor_set_aggregation_hint ( rand () );
    	
    	// database
    	$this->options = array ('host' => getDbHost (), 'username' => getDbUser (), 'password' => getDbPassword (), 'dbname' => getDbName () );
    	$this->db = Zend_Db::factory ( 'PDO_MYSQL', $this->options );
    	Zend_Db_Table_Abstract::setDefaultAdapter ( $this->db );
    }

    public function loginAction()
    {
    	
    	
        
    }
}

